import './App.css';
import BinaryConverter from './BinaryConverter'
import DecimalConverter from './decimalConverter'
import {Row,Col,PageHeader,Input,Button,Tabs} from 'antd'
import { FieldNumberOutlined,ThunderboltOutlined,FieldBinaryOutlined,QrcodeOutlined,HeartTwoTone} from '@ant-design/icons';
import { useState } from 'react';
function App() {
  let [InputValue,SetInputValue] = useState()
  const { TabPane } = Tabs;
  return (
    <div className="App">
      
      <Row justify="center">
      <Col span={24} style={{padding:0}}>

      <div className="card-container">
    <Tabs type="card">
      <TabPane tab={(<><FieldBinaryOutlined /> Binary to Decimal Conversion</>)} key="1" >
        <div>
        <BinaryConverter value={InputValue} />
        </div>
      </TabPane>
      <TabPane tab={<><QrcodeOutlined /> Decimal to Binary Conversion</>} key="2">
        <DecimalConverter value={InputValue}/>
</TabPane>
    </Tabs></div>
        <PageHeader 
    className="site-page-header"
    title={
    <div className="footer-fixed">
    <Input size="large" type="number" onChange={(e)=>SetInputValue(e.target.value)} className="header-input" placeholder="Enter Binary number, exp : 1010" prefix={<FieldNumberOutlined />} /> 
    <Button className="header-button"  type="primary">
    <ThunderboltOutlined />    Convert
        </Button>
  </div>
  }
  />
  <Col span="24" style={{textAlign:"center"}}>
   With <HeartTwoTone twoToneColor="#eb2f96" /> by <a href="https://instagram.com/66kcc">Tawfek mohammed</a>
  </Col>
        </Col>
      </Row>
    </div>
  );
}

export default App;
