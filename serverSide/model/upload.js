'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var UploadSchema = new Schema({
  image: {
    type: String,
    required: true
  }
});

mongoose.model('Upload', UploadSchema);