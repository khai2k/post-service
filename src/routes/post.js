import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import Joi from 'joi'
Joi.objectId = require('joi-objectid')(Joi)

import restifyRouter from 'restify-router'
import postDao from '../dao/post'
import post from '../models/post'

const Router = restifyRouter.Router
const postRoute = new Router()


postRoute.get("",
  async (req, res) => {
    let result = await postDao.readallPost();
    res.send(result);
  }
),
  postRoute.get("/:length",
    async (req, res) => {
      let length = req.params.length;
      let result = await postDao.readNumberOfPost(length);
      res.send(result);
    }
  ),
  postRoute.post(
    {
      path: '/:length',
      validation: {
        schema: Joi.object().keys({
          body: Joi.object()
            .keys({
              listPostId: Joi.array().required(),
            })
            .required()
        })
      }
    },
    async (req, res) => {
      let { listPostId } = req.body
      let { length } = req.params
      // console.log(listPostId, "listPostId", length)
      let result = await postDao.filterNumberOfPost({ listPostId, length })
      res.send(result);
    }
  ),
  postRoute.post(
    {
      path: '',
      validation: {
        schema: Joi.object().keys({
          body: Joi.object()
            .keys({
              content: Joi.string().required(),
              name: Joi.string().required(),
              userId: Joi.string().required()
            })
            .required()
        })
      }
    },
    async (req, res, next) => {
      try {
        const { content, name, userId } = req.body
        let result = await postDao.createPost({ content, name, userId })
        res.send({ data: result })
      } catch (error) {
        res.send(error)
      }
    }
  )

export default postRoute
