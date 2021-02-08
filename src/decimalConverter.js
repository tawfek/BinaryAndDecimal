import React from 'react'
import './App.css';
import {Col,Divider ,Result,Badge,Timeline, Typography ,Table, Row} from 'antd'

class DecimalConverter extends React.Component {

        state = {
            DecimalNumber:null,
            CurrentNumber:null,
            Result:null,
            DecimalWithoutFraction:null ,
            StepsArray:[],
            ResultArray:[],
            fraction:false,
            endOfOperation:true ,
            currentOperation:null,
            
                }
          
        DecimalConverterToBinary(num,base=2)
        {
            return Number(num).toString(base)
        }
        isFloat = (n)=>
        {
            return Number(n) === n && n % 1 !== 0;
        }
        CheckFraction = (n)=>
        {   
            n = Number(n)
            n = this.isFloat(n)
            this.setState({fraction:n})
            return n ;
        }
         StartConverter=()=>
         {   
             console.log('button clicked')
             this.Converter(this.state.DecimalNumber)
         }
         GetIntgerOnly= (e)=>
         {
            return (this.CheckFraction(Number(e)))?String(e).substr(0,String(e).indexOf('.')):e;
         }
         GetFractionPart = (e)=>
         {
            return (this.CheckFraction(Number(e)))?e.substr(e.indexOf('.')+1,e.length):e;
         }
         Steps = (number,isFraction=false,AllFractionNumbers=[])=>
         {  
            // Solve the integer part : 
            let n = number ;
            this.setState({ResultArray:[],StepsArray:[]})
            let TEMP_ResultArray = []
            let TEMP_StepsArray  = []
            if(n%2==1){
                TEMP_ResultArray.push(1)
            }
            while(true) {
                let isOdd = (n%2==1)?true:false ;
                let num = (isOdd)?Number(n)-1:Number(n);
                n= Number(num)/2
                if(!isOdd){
                    TEMP_ResultArray.push(0)
                }else{
                    TEMP_StepsArray.push(num)
                }
                if((n%2)==1){TEMP_ResultArray.push(1)};
                TEMP_StepsArray.push(n);
                this.setState({currentOperation:n,ResultArray:TEMP_ResultArray,StepsArray:TEMP_StepsArray})
                if((n)<=1){
                    this.setState({endOfOperation:false})
                    break;
                }

                        }
            let Result = this.DecimalConverterToBinary((isFraction)?Number(number+'.'+AllFractionNumbers):number)
            this.setState({
                Result,
            })

            // solve the fraction part : 
            /*
            if(isFraction)
            {   
                let j = 0 ;
                let FractionNumbers = AllFractionNumbers ;
                let TEMP_FRACTION_NUMBER =Number('0.'+FractionNumbers) ;
                let _a = TEMP_FRACTION_NUMBER;
                let Fraction_Result = []
                while (true) {
                    let b = _a;
                    _a=_a*2 
                    if(Number(this.GetFractionPart(String(b)))<=0){break ;}
                    console.log("temp f : ",b," *2 = ",_a)
                    b = _a - this.GetIntgerOnly(_a) ;
                    Fraction_Result.push(_a)
                    console.log(Fraction_Result)
                    if(j==5){
                        break ;
                    }
                    j++
                }
            } */
         }
         Converter = (e)=>
         {      
          let WithoutFraction = this.GetIntgerOnly(e)
          let FractionOnly =  this.GetFractionPart(e) 
          this.setState({endOfOperation:true,currentOperation:WithoutFraction,DecimalWithoutFraction:WithoutFraction}) 
          this.Steps(WithoutFraction,this.CheckFraction(Number(e)),FractionOnly)
         }
         UNSAFE_componentWillReceiveProps(nextProps, prevState, snapshot)
         {
             if(nextProps.value!=this.state.DecimalNumber){
                    this.setState({
                        DecimalNumber:nextProps.value,
                        CurrentNumber :nextProps.value
                    })
                    this.Converter(nextProps.value)                    
             }
         }

  render(){  
    const { Title } = Typography;
    const DATA_SOURCE = []
    this.state.ResultArray.forEach((e,i)=>{
            DATA_SOURCE.push({key:i,result:e,step:this.state.StepsArray[i],number:2})
    })
    const columns = [
        {
            title:'Result',
            align:'center',
            dataIndex:'result',
            key:'result',
            // width:'50',
            ellipsis: true,

        },
        {
            title:'step',
            align:'right',
            dataIndex:'step',
            key:'step',
            width:50,
            ellipsis: true,

        },
        {
            title:'Divided by',
            align:'left',
            dataIndex:'number',
            key:'number',
            width:'30',
            ellipsis: true,

        }
    ]
  return (
        <Col span={24}>
    {(this.state.DecimalNumber==null || this.state.DecimalNumber<-1 || this.state.DecimalNumber==""|| !this.state.DecimalNumber)?(<Result status="404" title="N0 NUMBER" subTitle="Please write your number to start."/>):
   <>
   <title>Decimal to binary Converter</title>
    <div>
        <Title level={3}>
        Converting ({this.state.CurrentNumber}) to Binary :
        </Title>
    <div>
        <Timeline>
    <Timeline.Item color="green">
        The Result : <br></br>
        <Divider orientation="left">

    <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>10</small>}  >({ this.state.CurrentNumber })</Badge> 
         =
        <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)"}}  offset={[5, 20]} count={<small>2</small>}  >(
        {this.state.Result})
        </Badge>
        </Divider>
    </Timeline.Item>

<Timeline.Item> 
<Divider orientation="left">
    - Step one : solve the integer part (no fraction): <br></br>
<Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>10</small>}  > ({ this.state.DecimalWithoutFraction }) </Badge> 
      =    <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)"}}  offset={[5, 20]} count={<small>2</small>}  >(
        {this.state.Result})
        </Badge>
    </Divider>
     <Row justify="center">
     <Col sm={24} md={12} lg={12} >
<Table bordered columns={columns} size="small" pagination={false} dataSource={DATA_SOURCE} />
     </Col>
     </Row>
</Timeline.Item>
<Timeline.Item> 
<Divider orientation="left">
    - Step two : solve fraction only <small>(berfore the point)</small> : <br></br>
    <h3>Comming soon...</h3>
    <img src="./wow.gif" alt="comming soon" width="150"></img>
{/* <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>10</small>}  > ({ this.state.DecimalWithoutFraction }) </Badge>  */}
      {/* = */}
    </Divider>
     <Row justify="center">
     <Col sm={24} md={12} lg={12} >

     </Col>
     </Row>
</Timeline.Item>
  </Timeline>
    
    </div>
    </div>

  </>  
}

        </Col>
       );
}
}

export default DecimalConverter;
