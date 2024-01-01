import Separator from 'components/atoms/separator'
import Box from 'components/layout/Box'
import Footer from 'components/organisms/footer'
import Header from 'components/organisms/header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Separator />
      <Box padding={3}>
        <Footer />
      </Box>
    </>
  )
}

export default Layout
