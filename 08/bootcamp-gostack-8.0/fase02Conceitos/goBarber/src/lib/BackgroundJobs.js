import Bee from 'bee-queue';
import EmailCancelamento from '../app/jobs/EmailCancelamento';
import redisConfig from '../config/redis';

const Jobs = [EmailCancelamento];

class BackgroundJobs {
  constructor() {
    this.jobs = {};

    this.init();
  }

  init() {
    Jobs.forEach(({ key, handle }) => {
      this.jobs[key] = {
        bee: new Bee(key, { redis: redisConfig }),
        handle,
      };
    });
  }

  add(jobLista, job) {
    return this.jobs[jobLista].bee.createJob(job).save();
  }

  processJob() {
    Jobs.forEach(job => {
      const { bee, handle } = this.jobs[job.key];

      bee.on('failed', this.falhaNoProcesso).process(handle);
    });
  }

  falhaNoProcesso(job, err) {
    console.log(`Job FAILED`, err);
  }
}

export default new BackgroundJobs();
