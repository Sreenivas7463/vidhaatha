const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')


newsRouter.get('', async(req, res) => {
   try {
        const newsAPI = await axios.get(`https://vidhaatha.com/wp-json/wp/v2/posts?_embed&per_page=100&page=1`)
        res.render('news', { articles : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:p', async(req, res) => {
    let pageNo = req.params.p

    try {
        const newsAPI = await axios.get(`https://vidhaatha.com/wp-json/wp/v2/posts?_embed&per_page=100&page=${pageNo}`)
        res.render('news', { articles : newsAPI.data})
    } catch (err) {
        if(err.response) {
            res.render('news', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.request) {
            res.render('news', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    } 
})

newsRouter.get('/:id/:mid', async(req, res) => {
    let articleID = req.params.id
    let mediaID =  req.params.mid

    try {
        const newsAPI = await axios.get(`https://vidhaatha.com/wp-json/wp/v2/posts/${articleID}`)
        const newsMedia = await axios.get(`https://vidhaatha.com/wp-json/wp/v2/media/${mediaID}`) //added image by Sreenivas
        res.render('newsSingle', { article : newsAPI.data, media: newsMedia.data, artid: articleID, mdid: mediaID })
    } catch (err) {
        if(err.response) {
            res.render('newsSingle', { article : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSingle', { article : null })
            console.log(err.requiest)
        } else {
            res.render('newsSingle', { article : null })
            console.error('Error', err.message)
        }
    } 
})


newsRouter.post('', async(req, res) => {
    let search = req.body.search
    try {
        const newsAPI = await axios.get(`https://vidhaatha.com/wp-json/wp/v2/posts?search=${search}`)
        res.render('newsSearch', { articles : newsAPI.data })
    } catch (err) {
        if(err.response) {
            res.render('newsSearch', { articles : null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if(err.requiest) {
            res.render('newsSearch', { articles : null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles : null })
            console.error('Error', err.message)
        }
    } 
})


module.exports = newsRouter 
