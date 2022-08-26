import { ErrorEntity } from 'src/utils/ResponseEntity/ErrorEntity';
import { KafkaTopics } from './enum/KafkaTopics';
import { Consumer, Kafka, KafkaConfig } from 'kafkajs';

export class KafkaStrems {
  private static _instance: KafkaStrems;

  static get Instance() {
    if (!this._instance) {
      this._instance = new KafkaStrems();
    }
    return this._instance;
  }

  private prepareKafkaConfigs(): KafkaConfig {
    try {
      const kafkaConfig = {} as KafkaConfig;
      kafkaConfig.clientId = process.env.KAFKA_CLIENT_ID;
      kafkaConfig.brokers = process.env.KAFKA_BROKERS.split(',');
      kafkaConfig.ssl = true;
      kafkaConfig.sasl = {
        mechanism: 'plain',
        username: process.env.KAFKA_USER_NAME,
        password: process.env.KAFKA_PASSWORD,
      };

      return kafkaConfig;
    } catch (error) {
      throw Promise.reject(new ErrorEntity({ error: error }));
    }
  }

  private async prepareKafkaConsumerClient(): Promise<Consumer> {
    try {
      const kafka = new Kafka(this.prepareKafkaConfigs());
      const consumer = kafka.consumer({
        groupId: process.env.KAFKA_CONSUMER_GROUP_ID,
      });
      await consumer.connect();
      await consumer.subscribe({ topics: Object.values(KafkaTopics) });
      return Promise.resolve(consumer);
    } catch (error) {
      throw Promise.reject(new ErrorEntity({ error: error }));
    }
  }

  async start(): Promise<boolean> {
    try {
      const consumer = await this.prepareKafkaConsumerClient();

      await consumer.run({
        autoCommit: false,
        eachMessage: async ({ topic, partition, message }) => {
          try {
            if (message.key) {
              const key = message.key.toString();
              console.log(key);
            }
            const value = message.value.toString();
            console.log(value);

            // consumer logic goes here

            consumer.commitOffsets([
              {
                topic: topic,
                partition: partition,
                offset: `${Number(message.offset) + 1}`,
              },
            ]);
          } catch (error) {
            console.log(error);
          }

        },
      });
      return Promise.resolve(true);
    } catch (error) {
      throw new ErrorEntity({ error: error });
    }
  }
}
