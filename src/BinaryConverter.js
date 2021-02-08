import React from 'react'
import './App.css';
import {Col,Divider ,Result,Badge,Timeline, Typography } from 'antd'

class BinaryConverter extends React.Component {

        state = {
            BinaryNumber:null,
            CurrentNumber:null,
            Result:null,
            StepsArray:[],
            fraction:false,
                }
          
        BinaryConverterToDecimal(num,base=2)
        {
            var [integer, fraction = ''] = num.toString().split('.');
            return parseInt(integer, base) + (integer[0] !== '-' || -1) * fraction
                .split('')
                .reduceRight((r, a) => (r + parseInt(a, base)) / base, 0);
        
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
             this.Converter(this.state.BinaryNumber)
         }
         Steps = (number,isFraction=false,AllFractionNumbers=[])=>
         {  
            this.setState({StepsArray:[]})
            let i = 0;
            let f = 0;
            let StepsNumbers = [] ;
            let ArrayNumber = String(number).split('').reverse();
            ArrayNumber.forEach(n => { 
                if(n!='.'){
                StepsNumbers.push({number:n,index:i,afterdot:false})
                }
                this.setState({StepsArray:StepsNumbers})
                i++
                
                                     });
            
            let FractionNumbersSteps = StepsNumbers ;
            if(isFraction && AllFractionNumbers!=null){
                AllFractionNumbers.split('').reverse().forEach(n => { 
                    if(n!='.'){
                        FractionNumbersSteps.push({number:n,index:f,afterdot:true})
                              }
                    this.setState({StepsArray:FractionNumbersSteps})
                    f++
                    
                });

            }
         }
         Converter = (e)=>
         {      if(e!=null){
                let WithoutFraction = (this.CheckFraction(Number(e)))?e.substr(0,e.indexOf('.')):e;;
                let FractionOnly =  (this.CheckFraction(Number(e)))?e.substr(e.indexOf('.')+1,e.length):e;
                this.Steps(WithoutFraction,this.CheckFraction(Number(e)),FractionOnly)
                var Decimal = this.BinaryConverterToDecimal(e)
                this.setState({BinaryNumber:WithoutFraction,Result:Decimal,BinaryNumberWithoutFraction:FractionOnly})
                            }
         }
         UNSAFE_componentWillReceiveProps(nextProps, prevState, snapshot)
         {
             if(nextProps.value!=this.state.BinaryNumber){
                    this.setState({
                        BinaryNumber:nextProps.value,
                        CurrentNumber :nextProps.value
                    })
                    this.Converter(nextProps.value)                    
             }
         }

  render(){  
    const { Title } = Typography;

  return (
        <Col span={24}>
    {(this.state.BinaryNumber==null || this.state.BinaryNumber<-1 || this.state.BinaryNumber==""|| !this.state.BinaryNumber)?(<Result status="404" title="N0 NUMBER" subTitle="Please write your baniry number to start."/>):
   <>
   <title>Decimal to binary Converter</title>

    <div>
        <Title level={3}>
        Converting ({this.state.CurrentNumber}) to Decimal :
        </Title>
    <div>
    <Timeline>
    <Timeline.Item>Step 1 - Multiplying each digit to 2 to power of its position : 
    <br></br>
    <Divider orientation="left">
    <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>2</small>}  >({ this.state.CurrentNumber })</Badge> = 
    {this.state.StepsArray.map((e,i)=>{
            return (<span key={i+1}>
                (<Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, -3]}  count={<small>{(e.afterdot==true)?'-'+String(e.index+1):''+String(e.index)}</small>}  > 2 </Badge> ×  {e.number}) 
                {(i==(this.state.StepsArray.length-1))?'':'+'}
                </span>)
        })} 
        <br></br>
        </Divider>
         </Timeline.Item>
    <Timeline.Item>Step 2 - Then add all the digits : <br></br>
    <Divider orientation="left">

    <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>2</small>}  >({ this.state.CurrentNumber })</Badge> = 
    {this.state.StepsArray.map((e,i)=>{
        return (<span key={i+1}>
                ({(Number(e.number)==1)?(Math.pow(2,(e.afterdot)?(e.index+1)*-1:e.index)):e.number}) 
                {(i==(this.state.StepsArray.length-1))?'':'+'}
                </span>)
        })}
        </Divider>
    </Timeline.Item>
    <Timeline.Item color="green">
        The Result : <br></br>
        <Divider orientation="left">

    <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)",border:0}}  offset={[3, 15]} count={<small>2</small>}  >({ this.state.CurrentNumber })</Badge> 
         =
        <Badge  showZero size="small" style={{color:"black",background:"rgba(0,0,0,0)"}}  offset={[5, 20]} count={<small>10</small>}  >(
        {this.state.Result})
        </Badge>
        </Divider>
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

export default BinaryConverter;
