import type { NextPage } from 'next'
import Link from 'next/link'
import BreadcrumbItem from 'components/atoms/breadcrumbItem'
import Text from 'components/atoms/text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import Breadcrumb from 'components/molecules/breadcrumb'
import Layout from 'components/templates'
import CartContainer from 'containers/cartContainer'
import { useAuthGuard } from 'utils/hooks'

const CartPage: NextPage = () => {
  // 認証ガード
  useAuthGuard()

  return (
    <Layout>
      <Flex
        paddingTop={2}
        paddingBottom={2}
        paddingLeft={{ base: 2, md: 0 }}
        paddingRight={{ base: 2, md: 0 }}
        justifyContent="center"
      >
        <Box width="1240px">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link href="/">
                <a>トップ</a>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>カート</BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Text display="block" variant="large" as="h1">
              カート
            </Text>
            {/*
              カートコンテナ
              カートの中にある商品を表示、購入、削除
            */}
            <CartContainer />
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default CartPage
