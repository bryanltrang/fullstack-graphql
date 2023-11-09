/**
 * Here are your Resolvers for your Schema. They must match
 * the type definitions in your scheama
 */

module.exports = {
  Query: {
    getUser(_, { input }, ctx) {
      return ctx.models.User.findOne(input ? input : {});
    },
    getPet(_, { input }, ctx) {
      console.log('QUERY => pet')
      return ctx.models.Pet.findOne(input ? input : {});
    },
    pets(_, { input }, ctx) {
      return ctx.models.Pet.findMany(input ? input : {});
    },
    users(_,{ input }, ctx) {
      return ctx.models.User.findMany(input ? input : {});
    }
  },
  Mutation: {
    newPet(_, { input }, ctx) {
      const newPet = ctx.models.Pet.create(input)
      return newPet
    }
  },
  Pet: {
    img(pet) {
      return pet.type === 'DOG'
        ? 'https://placedog.net/300/300'
        : 'http://placekitten.com/300/300'
    },
    owner(pet, _, ctx) {
      console.log('PET => owner')
      // return ctx.models.User.findOne();
      return ctx.user
    },
  },
  User: {
    pets(user, _, ctx) {
      console.log('USER => pets')
      return ctx.models.Pet.findMany()
    }
  }
}
