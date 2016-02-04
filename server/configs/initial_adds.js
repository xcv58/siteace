import {Websites} from '/libs/collections';

export default function () {
  if (!Websites.findOne()) {
    for (let lc = 1; lc <= 5; lc++) {
      const url = `This is the website url: ${lc}`;
      const desc = `Website ${lc}'s content is great!`;
      const [upvotes, downvotes] = [[], []];
      const createdAt = new Date();
      Websites.insert({url, desc, upvotes, downvotes, createdAt});
    }
  }
};
