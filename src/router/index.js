import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ReviewList from '../views/ReviewList.vue'
import Review from '../views/Review.vue'
import Feedback from '../views/Feedback.vue'
import Contact from '../views/Contact.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/review/list',
    name: 'reviewList',
    component: ReviewList
  }, {
    path: '/review/:id',
    name: 'review',
    component: Review
  }, {
    path: '/feedback',
    name: 'feedback',
    component: Feedback
  }, {
    path: '/contact',
    name: 'contact',
    component: Contact
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
