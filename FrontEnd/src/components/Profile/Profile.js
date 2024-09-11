import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, Typography, Button, Divider, Input, DatePicker, Select } from 'antd';
import { HomeOutlined, IdcardOutlined, LogoutOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import APIs, { endpoints } from '../../configs/APIs'; // Đảm bảo bạn đã cấu hình API đúng
import './Profile.css';

const { Title, Text } = Typography;
const { Option } = Select;

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await APIs.get(endpoints['current-user'], {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data); // Lưu thông tin người dùng vào state
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Ở đây bạn có thể thêm logic để lưu dữ liệu vào backend
  };

  const handleChange = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  if (!user) return <div>Loading...</div>; // Hiển thị loading nếu dữ liệu chưa được tải

  return (
    <div className="profile-container">
      <Card className="profile-card">
        <div className="profile-header">
          <Avatar size={120} src={user.avatar} /> {/* Giả sử avatar được trả về trong user */}
          <Title level={2}>{user.name}</Title>
        </div>
        
        <div className="profile-info">
          <InfoItem 
            label="Họ và tên" 
            value={user.fullName} 
            isEditing={isEditing}
            onChange={(value) => handleChange('fullName', value)}
          />
          <InfoItem 
            label="Email" 
            value={user.email} 
            isEditing={isEditing}
            onChange={(value) => handleChange('email', value)}
          />
          <InfoItem 
            label="Giới tính" 
            value={user.gender} 
            isEditing={isEditing}
            onChange={(value) => handleChange('gender', value)}
            inputType="select"
            options={['Nam', 'Nữ', 'Khác']}
          />
          <InfoItem 
            label="Số điện thoại" 
            value={user.phoneNumber} 
            isEditing={isEditing}
            onChange={(value) => handleChange('phoneNumber', value)}
          />
          <InfoItem 
            label="Ngày sinh" 
            value={user.dateOfBirth} 
            isEditing={isEditing}
            onChange={(value) => handleChange('dateOfBirth', value)}
            inputType="date"
          />
          <InfoItem 
            label="Địa chỉ" 
            value={user.address} 
            isEditing={isEditing}
            onChange={(value) => handleChange('address', value)}
          />
          {/* Thêm các trường khác nếu cần */}
        </div>
        
        <Button 
          type="primary" 
          block 
          className="update-button"
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
          onClick={isEditing ? handleSave : handleEdit}
        >
          {isEditing ? 'Lưu thông tin' : 'Chỉnh sửa thông tin'}
        </Button>
        
        <div className="profile-actions">
          <Link to="/" className="action-button">
            <HomeOutlined />
            <Text>Trang chủ</Text>
          </Link>
          <Link to="/membership" className="action-button">
            <IdcardOutlined />
            <Text>Thành viên</Text>
          </Link>
          <Link to="/logout" className="action-button">
            <LogoutOutlined />
            <Text>Đăng xuất</Text>
          </Link>
        </div>
      </Card>
    </div>
  );
};

const InfoItem = ({ label, value, isEditing, onChange, inputType = 'text', options = [] }) => (
  <>
    <div className="info-item">
      <Text strong>{label}:</Text>
      {isEditing ? (
        inputType === 'select' ? (
          <Select 
            style={{ width: '100%' }} 
            value={value} 
            onChange={onChange}
          >
            {options.map(option => (
              <Option key={option} value={option}>{option}</Option>
            ))}
          </Select>
        ) : inputType === 'date' ? (
          <DatePicker 
            style={{ width: '100%' }} 
            value={moment(value, 'DD/MM/YYYY')} 
            onChange={(date, dateString) => onChange(dateString)}
            format="DD/MM/YYYY"
          />
        ) : (
          <Input 
            value={value} 
            onChange={(e) => onChange(e.target.value)} 
          />
        )
      ) : (
        <Text>{value}</Text>
      )}
    </div>
    <Divider />
  </>
);

export default Profile;