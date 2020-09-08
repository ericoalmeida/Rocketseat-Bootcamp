import Beequeue from 'bee-queue';

import CancellationMailJob from '../jobs/cancellationMail';
import redisSettings from '../../settings/redis';

const listJobs = [CancellationMailJob];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  /**
   * Init queues
   */
  init() {
    listJobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Beequeue(key, {
          redis: redisSettings,
        }),
        handle,
      };
    });
  }

  /**
   * add new job to the queues
   */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  /**
   * process queues
   */
  process() {
    listJobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.processError).process(handle);
    });
  }

  /**
   * errors of queues
   */
  processError(job, error) {
    console.log(`Queue ${job.queue.name} FAILED`, error);
  }
}

export default new Queue();
