import AsyncApp from '../index'

import logger from './middleware/logger'
import responseTime from './middleware/response-time'

import {
    info
} from '../src/util'

let app = new AsyncApp(),
    port = 8080

app.use(logger())
app.use(responseTime())

app.use('/home', (ctx) => {
    ctx.body = info('home route is ok')
})

app.use(async (ctx, next) => {
    ctx.req.test = 'this is a slash path'
    await new Promise(resolve => {
        setTimeout(async () => {
            resolve(1)
        }, 1000)
    })

    await next()

    await new Promise(resolve => {
        setTimeout(async () => {
            resolve(1)
        }, 1000)
    })
    // res.end(info('route is ok'))
})

app.use('*', async (ctx) => {
    await new Promise(resolve => {
        setTimeout(async () => {
            resolve(1)
        }, 1000)
    })
    ctx.body = (info('this is default route' + ctx.req.test))
})

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})