import {Websites} from '/libs/collections';

export default function () {
  if (!Websites.findOne()) {
    console.log("No websites yet. Creating starter data.");
    [{
      title:"Goldsmiths Computing Department",
      url:"http://www.gold.ac.uk/computing/",
      desc:"This is where this course was developed.",
      createdAt:new Date()
    }, {
      title:"University of London",
      url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
      desc:"University of London International Programme.",
      createdAt:new Date()
    }, {
      title:"Coursera",
      url:"http://www.coursera.org",
      desc:"Universal access to the world’s best education.",
      createdAt:new Date()
    }, {
      title:"Google",
      url:"http://www.google.com",
      desc:"Popular search engine.",
      createdAt:new Date()
    }].map(({title = 'No title', url, desc, upvotes = [], downvotes = [], createdAt}) => {
      Websites.insert({url, title, desc, upvotes, downvotes, createdAt});
    });
  }
};
