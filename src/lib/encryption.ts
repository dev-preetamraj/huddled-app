export const encrypt = (userId: string) => {
  const secretKey = process.env.EXPO_PUBLIC_SECRET_KEY!;
  let encrypted = '';
  for (let i = 0; i < userId.length; i++) {
    const charCode =
      userId.charCodeAt(i) ^ secretKey.charCodeAt(i % secretKey.length);
    encrypted += String.fromCharCode(charCode);
  }
  return encrypted;
};
