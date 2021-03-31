import axios from 'axios';
import React from 'react';
import {ActivityIndicator, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {API_URL} from '../config/constants.js';
import Avatar from '../assets/icons/avatar.png';
import dayjs from 'dayjs';

export default function ProductScreen(props){
    const { id } = props.route.params;
    
    const [product, setProduct] = React.useState(null);
    React.useEffect(()=>{
        axios.get(`${API_URL}/products/${id}`)
        .then((result)=>{
            console.log(result);
            setProduct(result.data.product);
        }).catch((error)=>{
            console.error(error);

        })
    },[]);
    const onPressButton = () =>{
        if(product.soldout === 1){
            alert('구매완료되었습니다');
        }
    }

    if(!product){
        return <ActivityIndicator />
    }

    return (
        <View>
            <ScrollView>    
                <View>
                    <Image 
                    style={Styles.productImage}
                    source={{url:`${API_URL}/${product.imageUrl}`}}
                    resizeMode={'contain'}
                    />
                </View>
                <View style={Styles.productSection}>
                    <View  style={Styles.productSeller}>
                        <Image 
                        style={Styles.avatarImage}
                        source={Avatar}
                        />
                        <Text>{product.seller}</Text>
                    </View>
                    <View style={Styles.divider}></View>
                    <View>
                        <Text style={Styles.productName}>{product.name}</Text>
                        <Text style={Styles.productPrice}>{product.price}원</Text>
                        <Text style={Styles.productDate}>{dayjs(product.description).format('YYYY년 MM월 DD일')}</Text>
                        <Text style={Styles.productDescription}>{product.description}</Text>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity onPress={onPressButton}>
                <View style={product.soldout === 1 ? Styles.purchaseDisabled : Styles.purchaseButton}>
                    <Text style={Styles.purchaseText}>{product.soldout === 1 ? '구매완료' : '구매하기'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const Styles = StyleSheet.create({
    productImage:{
        flex:1,
        backgroundColor:'#fff'
    },
    productImage:{
        width:'100%',
        height:300
    },
    productSeller:{
        flexDirection:'row',
        alignItems:'center',
    },
    avatarImage:{
        width:50,
        height:50
    },
    productSection:{
        padding:8
    },
    divider:{
        backgroundColor:'#e9ecef',
        height:1,
        marginVertical:16
    },
    productName:{
        fontSize:20,
        fontWeight:'400'
    },
    productPrice:{
        fontSize:18,
        fontWeight:'700',
        marginTop:8
    },
    productDate:{
        fontSize:14,
        marginTop:4,
        color:'rgb(204,204,204)'
    },
    productDescription:{
        marginTop:16,
        fontSize:17
    },
    purchaseButton:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:60,
        backgroundColor:'rgb(255,80,88)',
        alignItems:'center',
        justifyContent:'center'
    },
    purchaseText:{
        color:'white',
        fontSize:20
    },
    purchaseDisabled:{
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        height:60,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'gray',
    }
})