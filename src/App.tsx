import { Button, Form, Input, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { getCurrentUser, loginWithPassword } from './api/auth';
import { components } from './api/types';

type CurrentUserDto = components['schemas']['CurrentUserDto'];
type AuthResponseDto = components['schemas']['AuthResponseDto'];
type LoginWithPasswordDto = components['schemas']['LoginWithPasswordDto'];

function App() {
  const [user, setUser] = useState<CurrentUserDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Kiểm tra user khi đã có token
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setLoading(true);
        try {
          const userData = await getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUser();
  }, []);

  // Xử lý đăng nhập
  const onFinish = async (values: LoginWithPasswordDto) => {
    setLoading(true);
    try {
      const authData: AuthResponseDto = await loginWithPassword(values);
      localStorage.setItem('accessToken', authData.accessToken);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>XTS Frontend</h1>
      {loading ? (
        <Spin />
      ) : user ? (
        <div>
          <p>Welcome, {user.full_name}!</p>
          <p>Email: {user.email || 'N/A'}</p>
          <p>Phone: {user.phone || 'N/A'}</p>
          <Button onClick={() => { localStorage.removeItem('accessToken'); setUser(null); }}>
            Logout
          </Button>
        </div>
      ) : (
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="identifier"
            label="Identifier (Email/Phone)"
            rules={[{ required: true, message: 'Please enter your identifier' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default App;