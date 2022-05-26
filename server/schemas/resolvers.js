const { AuthenticationError } = require("apollo-server-express");
const { GraphQLScalarType, Kind } = require("graphql");

const { Admin, Result } = require("../models");
const { signToken } = require("../utils/auth");

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    return value.getTime(); // Convert outgoing Date to integer for JSON
  },
  parseValue(value) {
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

const resolvers = {
  Date: dateScalar,
  Query: {
    admin: async (parent, args, context) => {
      if (context.user) {
        return await Admin.findById({ _id: context.user._id });
      }
    },
    results: async (parent, args, context) => {
      const results = await Result.find();
      return results;
    },
  },
  Mutation: {
    addAdmin: async (
      parent,
      { firstName, lastName, email, medicalLicenseNumber, password }
    ) => {
      const user = await Admin.create({
        firstName,
        lastName,
        email,
        medicalLicenseNumber,
        password,
      });
      const token = signToken(user);

      return { token, user };
    },

    addResult: async (
      parent,
      { patientFirstName, patientLastName, phoneNumber, createdAt },
      context
    ) => {
      if (context.user) {
        const result = new Result({
          patientFirstName,
          patientLastName,
          phoneNumber,
          createdAt,
        });

        await result.save();

        await Admin.findByIdAndUpdate(context.user._id, {
          $push: { results: result },
        });

        return result;
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, { email, password }) => {
      const user = await Admin.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    deleteResult: async (parent, { patientFirstName, patientLastName, phoneNumber}, context) =>{
      if (context.user) {
        const deletedResult = await Result.findOneAndDelete({patientFirstName, patientLastName, phoneNumber});
        const deletedResultId = deletedResult._id;

        const updatedUser = await Admin.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { results: { deletedResultId} } },
          { new: true }
        );
        return updatedUser;
      }
      
    },

    updateResult: async (parent, {_id, patientFirstName, patientLastName, phoneNumber }, context) =>{
      if (context.user) {
        const updatedResult = await Result.findByIdAndUpdate({_id: _id}, {patientFirstName: patientFirstName , patientLastName: patientLastName, phoneNumber: phoneNumber});
        const updatedResultId = await updatedResult._id;

        const updatedUser = await Admin.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { results: { updatedResultId} } },
          { new: true }
        );

        await updatedResult.save();
        await updatedUser.save();

        return updatedUser;
      }
    }

  },
};

module.exports = resolvers;
