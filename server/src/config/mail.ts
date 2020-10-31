interface IMailConfig {
  driver: 'ethereal' | 'ses'

  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'vinnie@malafaia.com.br',
      name: 'Vinnie da Malafaia'
    }
  }
} as IMailConfig
