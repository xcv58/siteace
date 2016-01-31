import {Mongo} from 'meteor/mongo';

export const Websites = new Mongo.Collection('websites');

export default {
  Websites: Websites
};
