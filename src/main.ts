import { KafkaStrems } from './processing/KafkaStrems';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  KafkaStrems.Instance.start();
}
bootstrap();
