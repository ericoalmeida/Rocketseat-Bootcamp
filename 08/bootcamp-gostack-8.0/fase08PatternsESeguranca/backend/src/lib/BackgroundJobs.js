import Bee from 'bee-queue';

import EmailRetornoSolicitacao from '../app/Jobs/EmailRetornoSolicitacao';
import redisConfig from '../config/redis';

const Jobs = [EmailRetornoSolicitacao];

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

  processarJobs() {
    Jobs.forEach(job => {
      const { bee, handle } = this.jobs[job.key];

      bee.on('failed', this.falhaAoProcessarJob).process(handle);
    });
  }

  falhaAoProcessarJob(job, err) {
    console.log(`Job FAILED`, err);
  }
}

export default new BackgroundJobs();
