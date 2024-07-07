import React from "react";
import { SafeAreaView, View,FlatList,Text,StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
events:[],
loading:true
    }
  }
  state = {  }


  componentDidMount(){
    axios.get("https://eonet.gsfc.nasa.gov/api/v2.1/events").then((res)=>{

      this.setState({events:res.data.events,loading:false})
      console.log(res.data.events)
    }).catch((e)=>console.log(e));
  }
  render() { 

 const   {events,loading}=this.state;

    return (<SafeAreaView style={{flex:1}}>
{(loading==true)?<View style={{alignItems:'center', justifyContent:'center',flex:1 }}>
  <ActivityIndicator size='large' color='black'></ActivityIndicator>
  <Text style={{color:'black',fontSize:20,fontWeight:'700'}}>Loading Data</Text></View>:<FlatList
data={events}
renderItem={({item})=><View style={{padding:10,backgroundColor:'grey',margin:10,borderRadius:7}}>
  <Text style={[style.text, {fontSize:20, fontWeight:'800'}]}>{item.title}</Text>
  <Text style={style.text}>
  {item.description !== "" ? item.description : "Description is not found!"}
</Text>
  <Text style={[style.text,{fontWeight:'700'}]}>{item.categories[0].title}</Text>
  </View>}
>


</FlatList>}



    </SafeAreaView>  );
  }
}

const style =StyleSheet.create({
text:{color:'white',fontSize:15, }
})
 
export default App;