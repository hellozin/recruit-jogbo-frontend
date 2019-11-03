import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Join from '../views/Join.vue'
import Confirm from '../views/Confirm.vue'
import Member from '../views/Member.vue'
import ReviewList from '../views/ReviewList.vue'
import Review from '../views/Review.vue'
import ReviewForm from '../views/ReviewForm.vue'
import TipList from '../views/TipList.vue'
import Tip from '../views/Tip.vue'
import TipForm from '../views/TipForm.vue'
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
    path: '/join',
    name: 'join',
    component: Join
  }, {
    path: '/confirm',
    name: 'confirm',
    component: Confirm
  }, {
    path: '/member',
    name: 'member',
    component: Member
  }, {
    path: '/review/list',
    name: 'reviewList',
    component: ReviewList
  }, {
    path: '/review/form',
    name: 'reviewCreateForm',
    component: ReviewForm
  }, {
    path: '/review/form/:id',
    name: 'reviewUpdateForm',
    component: ReviewForm
  }, {
    path: '/review/:id',
    name: 'review',
    component: Review
  }, {
    path: '/tip/list',
    name: 'tipList',
    component: TipList
  },  {
    path: '/tip/form',
    name: 'tipCreateForm',
    component: TipForm
  }, {
    path: '/tip/form/:id',
    name: 'tipUpdateForm',
    component: TipForm
  }, {
    path: '/tip/:id',
    name: 'tip',
    component: Tip
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
