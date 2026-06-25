import { checkForCloseINC } from './checkForCloseINC'
import { CronJob } from 'cron'

export const taskCloseINCs = () => {
  let taskRunning = false
  new CronJob(
    '* 51 21 * * *',
    async () => {
      if (taskRunning) return
      taskRunning = true
      const res = await checkForCloseINC()
      if (res.status) {
        setTimeout(() => {
          taskRunning = false
        }, 60000)
        return
      }
      taskRunning = false
    },
    null,
    true,
    'Etc/UTC',
  )
}
