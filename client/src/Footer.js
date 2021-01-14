import { FormattedMessage } from 'react-intl'

const Footer = ({ locale }) => {
  
  const getDate = (locale) => {
    let today = new Date()
    return (
      `${new Intl.DateTimeFormat(locale).format(today)}`
    )
  }

  return (
    <div className="footer">
      <FormattedMessage id="footer.text" /> {getDate(locale)} - github.com/jmsalonen/tenttiapp
    </div>
  )
}

export default Footer
