const axios = require('axios');
const config = require('../../../config.json');

const get = async (address) => {
    const addressQs = slugify(address)
    const apiKey = `${config.GOOGLE_API_KEY}`;
    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressQs}&key=${apiKey}`
    
    const locationResponse = await axios.get(uri);
    return {
        latitude: locationResponse.data.results[0].geometry.location.lat,
        longitude: locationResponse.data.results[0].geometry.location.lng,
    }

}

const slugify = (string) => {
    const a = 'àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœṕŕßśșțùúüûǘẃẍÿź·/_,:;'
    const b = 'aaaaaaaaceeeeghiiiimnnnoooooprssstuuuuuwxyz------'
    const p = new RegExp(a.split('').join('|'), 'g')
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with ‘and’
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

module.exports.get = get;