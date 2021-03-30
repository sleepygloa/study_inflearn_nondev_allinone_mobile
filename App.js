import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import BasketballImage from "./assets/products/basketball1.jpeg";
import Avatar from "./assets/icons/avatar.png";
import {API_URL} from './assets/config/constants.js';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function App() {
  const [products, setProducts] = React.useState([])
  React.useEffect(()=>{
    axios.get(`${API_URL}/products`)
    .then((result)=>{
      console.log(result);
      setProducts(result.data.products);
    }).catch((error)=>{
      console.error(error);
    })
  },[])
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headLine}>판매되는 상품들</Text>
        <View style={styles.productList}>
        {
          products.map((product, index)=>{
            return(
            <View style={styles.productCard}>
              <View>
                <Image style={styles.productImage} 
                source={
                  {url: `${API_URL}/${product.imageUrl}`}
                } 
                
                resizeMode={"contain"}/>
              </View>
              <View style={styles.productContent}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.productFooter}>
                  <View style={styles.productSeller}>
                    <Image style={styles.productAvatar} source={Avatar} />
                    <Text style={styles.productSellerName}>{product.seller}</Text>
                  </View>
                  <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
                </View>
              </View>
            </View>
            )
          })
        }
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:32
  },
  productCard:{
    width:320,
    borderColor:  'rgb(230,2350,230)',
    borderWidth:1,
    borderRadius:16,
    backgroundColor:'white',
    marginBottom:8
  },
  productImage:{
    width:'100%',
    height:210
  },
  productContent:{
    padding:8
  },
  productSeller:{
    flexDirection:'row'
  },
  productAvatar:{
    width:24,
    height:24
  },
  productFooter:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:12
  },
  productName:{
    fontSize:14
  },
  productPrice:{
    fontSize:16,
    fontWeight:'600',
    marginTop:8
  },
  productSellerName:{
    fontSize:16
  },
  productDate:{
    fontSize:16
  },
  productList:{
    alignItems:'center'
  },
  headLine:{
    fontSize:24,
    fontWeight:'800',
    margin:24
  }
});
