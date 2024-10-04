import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const algorithm = 'aes-256-cbc';

// Generate a secure, random key
const key = randomBytes(32);

// Generate an initialization vector
const iv = randomBytes(16);

export function encryptor(text: string, salt: string): string {
  const cipher = createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text + salt, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decryptor(encryptedText: string, salt: string): string {
  try {
    const decipher = createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return String(decrypted).replace(salt, '');
  } catch (error) {
    return '500';
  }
}
