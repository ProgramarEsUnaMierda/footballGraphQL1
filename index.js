
var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var fakeDb = require ('./fakeDb');
var _ = require ('underscore');

var schema = buildSchema (`
  type Query {
    teams: [String]
    playersList (team: String!): [Player]
    player (team: String!, num: String!): Player
  }

  type Player {
    firstname: String
    lastname: String
    goals: Int
    team: String
    number: String
    hurray: String
    teamMates: [Player]
  }
  `);

  class Player {

    constructor (team, number) {
      let footballPlayer = _.findWhere(fakeDb[team], {'number': number});
      this.firstname = footballPlayer.firstname;
      this.lastname = footballPlayer.lastname;
      this.goals = footballPlayer.goals;
      this.number = footballPlayer.number;
      this.team = team;
    }

    hurray () {
      return `Hurray ${this.firstname}, hurray!!`;
    }

    teamMates () {
      var teamList = [];
      var team = this.team;
      var numb = this.number;

      _.each (fakeDb[team], function (obj) {
        if (obj.number !== numb) {
          teamList.push( new Player (team, obj.number));
        }
      });

      return teamList;
    }
  }

  var root = {
    teams: function () {
      return _.keys(fakeDb);
    },
    playersList: function ({team}) {
      var teamList = [];
      _.each (fakeDb[team], function (obj) {
        teamList.push (new Player (team, obj.number));
      });
      return teamList;
    },
    player: function ({team,num}) {
      return new Player (team,num);
    }
  };

  var app = express();

  app.use('/football', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

  app.listen(4000);
  console.log('Running a GraphQL Football API server at localhost:4000/football');
