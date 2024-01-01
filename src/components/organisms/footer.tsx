import Link from 'next/link'
import styled from 'styled-components'
import { GitHubIcon } from 'components/atoms/iconButton'
import Text from 'components/atoms/text'
import Box from 'components/layout/Box'
import Flex from 'components/layout/Flex'

const Anchor = styled(Text)`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

/**
 * フッター
 */
const Footer = () => {
  return (
    <footer>
      <Flex flexDirection={{ base: 'column', md: 'row' }}>
        <Box
          minWidth={{ base: '100%', md: '120px' }}
          paddingRight={{ base: 0, md: 1 }}
        >
          <nav>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">トップ</Anchor>
              </Link>
            </Box>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">採用</Anchor>
              </Link>
            </Box>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">お知らせ</Anchor>
              </Link>
            </Box>
          </nav>
        </Box>
        <Box
          minWidth={{ base: '100%', md: '120px' }}
          paddingRight={{ base: 0, md: 1 }}
        >
          <nav>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">利用規約</Anchor>
              </Link>
            </Box>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">プライバシーポリシー</Anchor>
              </Link>
            </Box>
            <Box marginBottom={2}>
              <Link href="/" passHref legacyBehavior>
                <Anchor as="a">配送と返品</Anchor>
              </Link>
            </Box>
          </nav>
        </Box>
      </Flex>
    </footer>
  );
}

export default Footer
