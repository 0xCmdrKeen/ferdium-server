const Event = use('Event');
const Mail = use('Mail');
const Env = use('Env');

Event.on('forgot::password', async ({ user, token }) => {
  const body = `
Hello ${user.username},
we just received a request to reset your password of your Ferdi account.
Use the link below to reset your password. If you havn't requested this, please ignore this message.

${Env.get('EXTERNAL_DOMAIN')}/user/reset?token=${encodeURIComponent(token)}

This message was sent automatically. Please do not reply.
`;
  console.log('Sending message', body);
  try {
    await Mail.raw(body, (message) => {
      message.subject('[Ferdi] Reset your password');
      message.from(Env.get('MAIL_SENDER'));
      message.to(user.email);
    });
  } catch (e) {
    console.log(`Couldn't send mail: ${e}`);
  }
});
