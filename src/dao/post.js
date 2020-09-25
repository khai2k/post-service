import postModel from '../models/post'
import bcrypt from 'bcryptjs'
import { date } from 'joi'

const post = {
  async createPost({ content, name, userId }) {
    let date = new Date();
    let result = await postModel.create({
      date,
      content,
      name,
      userId
    })
    return result
  },
  async readallPost() {
    let result = await postModel.find({})
    return result
  },
  async readNumberOfPost(length) {
    let result = await postModel.find().sort({ date: -1 }).limit(parseInt(length))
    return result
  },
  async filterNumberOfPost({ listPostId, length }) {
    let i = 0; let data = [];
    // console.log(listPostId[0], " ", length)
    while (data.length < length) {
      i = i + 1;
      let resultt = await postModel.find().sort({ date: -1 }).limit(i * parseInt(length))
      let result = resultt.slice(i * parseInt(length) - length, i * parseInt(length))
      let exist = false;
      for (let indexx = 0; indexx < result.length; indexx++) {
        for (let index = 0; index < listPostId.length; index++) {
          if (result[indexx]._id == listPostId[index]._id) { exist = true; break }
        }
        if (exist == false) {
          listPostId = [...listPostId, result[indexx]._id]
          data = [...data, result[indexx]];
          if (data.length >= length) return data;

        }
        exist = false;
      }
    }
    console.log(data.length, "length")
    return data;
  },

}

export default post
