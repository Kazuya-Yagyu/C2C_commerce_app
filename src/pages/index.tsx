import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Link from 'next/link'
import Text from 'components/atoms/text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'
import ProductCard from 'components/organisms/productCard'
import ProductCardCarousel from 'components/organisms/productCardCarousel'
import Layout from 'components/templates'
import getAllProducts from 'services/products/get-all-products'
import { ApiContext, Product } from 'types'
import { Anchor } from '@mui/icons-material'

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>

const HomePage: NextPage<HomePageProps> = ({
  bookProducts,
  clothesProducts,
  shoesProducts,
}: HomePageProps) => {
  // 商品カードカルーセルをレンダリング
  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductCardCarousel>
        {products.map((p: Product, i: number) => (
          <Box paddingLeft={i === 0 ? 0 : 2} key={p.id}>
            <Link href={`/products/${p.id}`} passHref legacyBehavior>
              <a>
                <ProductCard
                  variant="small"
                  title={p.title}
                  price={p.price}
                  imageUrl={p.imageUrl}
                  blurDataUrl={p.blurDataUrl}
                />
              </a>
            </Link>
          </Box>
        ))}
      </ProductCardCarousel>
    );
  }

  return (
    <Layout>
      <Flex padding={2} justifyContent="center" backgroundColor="primary">
        <Flex
          width={{ base: '100%', md: '1040px' }}
          justifyContent="space-between"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Box width="100%">
            <Text as="h1" marginTop={2} color="white" variant="extraLarge">
              汝の好まむる品を求むべし
            </Text>
          </Box>
          <Box width="100%">
            <Text as="p" color="white" variant="mediumLarge">
            歓迎せん、我がEC市場へ。我がウェブの市街は、遠方の商人より高貴な品々を運び、庶民に贅沢な買い物の機会をもたらん。魅惑の品々が、君を待つ。絹の羅を纏った美の衣、銅の器に注がれた甘美な蜜酒、遠くの地より届く美しい工芸品。我が市場に参り、古き良き時代の趣と新しい暮らしの魅力を感じよ。君の手で、これらの至宝を手に入れん。驚異の物々交換が、君の暮らしに夢と繁栄をもたらさん。
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex paddingBottom={2} justifyContent="center">
        <Box
          paddingLeft={{ base: 2, md: 0 }}
          paddingRight={{ base: 2, md: 0 }}
          width={{ base: '100%', md: '1040px' }}
        >
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              武器
            </Text>
            {renderProductCardCarousel(clothesProducts)}
          </Box>
          <Box marginBottom={3}>
            <Text as="h2" variant="large">
              本
            </Text>
            {renderProductCardCarousel(bookProducts)}
          </Box>
          <Box>
            <Text as="h2" variant="large">
              靴
            </Text>
            {renderProductCardCarousel(shoesProducts)}
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }
  // 各商品のトップ6個を取得し、静的ページを作成
  // 60秒でrevalidateな状態にし、静的ページを更新する
  const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
    getAllProducts(context, { category: 'clothes', limit: 6, page: 1 }),
    getAllProducts(context, { category: 'book', limit: 6, page: 1 }),
    getAllProducts(context, { category: 'shoes', limit: 6, page: 1 }),
  ])

  return {
    props: {
      clothesProducts,
      bookProducts,
      shoesProducts,
    },
    revalidate: 60,
  }
}

export default HomePage
