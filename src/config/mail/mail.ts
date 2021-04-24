interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'password-reset-noreply@brasacode.com.br',
      name: 'Assistência para senha da Brasacode Web Services',
    },
  },
} as IMailConfig;
