import { useForm } from 'react-hook-form'
import Button from 'components/atoms/button'
import Input from 'components/atoms/input'
import Text from 'components/atoms/text'
import Box from 'components/layout/Box'

export type SigninFormData = {
  username: string
  password: string
}

interface SigninFormProps {
  /**
   * サインインボタンを押した時のイベントハンドラ
   */
  onSignin?: (username: string, password: string) => void
}

/**
 * サインインフォーム
 */
const SigninForm = ({ onSignin }: SigninFormProps) => {
  // React Hook Formの使用
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>()
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data

    onSignin && onSignin(username, password)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box marginBottom={1}>
        {/* サインインユーザー名の入力 */}
        <Input
          {...register('username', { required: true })}
          name="username"
          type="text"
          placeholder="ユーザー名"
          hasError={!!errors.username}
        />
        {errors.username && (
          <Text color="danger" variant="small" paddingLeft={1}>
            ユーザー名は必須です
          </Text>
        )}
      </Box>
      <Box marginBottom={2}>
        {/* サインインパスワードの入力 */}
        <Input
          {...register('password', { required: true })}
          name="password"
          type="password"
          placeholder="パスワード"
          hasError={!!errors.password}
        />
        {errors.password && (
          <Text color="danger" variant="small" paddingLeft={1}>
            パスワードは必須です
          </Text>
        )}
      </Box>
      <Button width="100%" type="submit">
        サインイン
      </Button>
    </form>
  )
}

export default SigninForm