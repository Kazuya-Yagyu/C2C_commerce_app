import type {
    GetStaticPaths,
    GetStaticPropsContext,
    InferGetStaticPropsType,
    NextPage,
  } from 'next'
  import Link from 'next/link'
  import { useRouter } from 'next/router'
  import BreadcrumbItem from 'components/atoms/breadcrumbItem'
  import Separator from 'components/atoms/separator'
  import Box from 'components/layout/Box'
  import Flex from 'components/layout/Flex'
  import Breadcrumb from 'components/molecules/breadcrumb'
  import Layout from 'components/templates'
  import UserProductCardListContainer from 'containers/userProductCartListContainer'
  import UserProfileContainer from 'containers/userProfileContainer'
  import getAllProducts from 'services/products/get-all-products'
  import getAllUsers from 'services/users/get-all-users'
  import getUser from 'services/users/get-user'
  import type { ApiContext } from 'types'
  
  type UserPageProps = InferGetStaticPropsType<typeof getStaticProps>
  
  const UserPage: NextPage<UserPageProps> = ({
    id,
    user,
    products,
  }: UserPageProps) => {
    const router = useRouter()
  
    if (router.isFallback) {
      return <div>Loading...</div>
    }
  
    return (
      <Layout>
        <Flex
          paddingTop={2}
          paddingBottom={2}
          paddingLeft={{ base: 2, md: 0 }}
          paddingRight={{ base: 2, md: 0 }}
          justifyContent="center"
        >
          <Box width="1180px">
            <Box marginBottom={2}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link href="/">
                    トップ
                  </Link>
                </BreadcrumbItem>
                {user && <BreadcrumbItem>{user.username}</BreadcrumbItem>}
              </Breadcrumb>
            </Box>
            <Box>
              <Box marginBottom={1}>
                {/*
                  ユーザープロファイルコンテナ
                  ユーザー情報を表示する。useUserで常に最新のデータを取得する。
                */}
                <UserProfileContainer userId={id} user={user} />
              </Box>
              <Box marginBottom={1}>
                <Separator />
              </Box>
              {/*
                ユーザー商品カードリストコンテナ
                ユーザーが所持する商品カードリストを表示する。useSearchで常に最新のデータを取得する。
              */}
              <UserProductCardListContainer userId={id} products={products} />
            </Box>
          </Box>
        </Flex>
      </Layout>
    );
  }
  
  export const getStaticPaths: GetStaticPaths = async () => {
    const context: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    }
    const users = await getAllUsers(context)
    const paths = users.map((u) => `/users/${u.id}`)
  
    return { paths, fallback: true }
  }
  
  export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
    const context: ApiContext = {
      apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
    }
  
    if (!params) {
      throw new Error('params is undefined')
    }
  
    const userId = Number(params.id)
    const [user, products] = await Promise.all([
      getUser(context, { id: userId }),
      getAllProducts(context, { userId }),
    ])
  
    return {
      props: {
        id: userId,
        user,
        products: products ?? [],
      },
      revalidate: 10,
    }
  }
  
  export default UserPage
  