import {StyleSheet} from 'react-native'

const globalStyles = StyleSheet.create({

    contenedor:{
        backgroundColor:'#FFF',
        marginHorizontal:10,
        borderRadius:20,
        paddingVertical:40,
        paddingHorizontal:40,
        transform: [{translateY:80}],
        shadowColor: "#000",
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 5
    },contenedor2:{

        backgroundColor:'#FFF',
        marginHorizontal:10,
        borderRadius:20,
        paddingVertical:40,
        marginTop:10,
        shadowColor: "red",
        shadowOpacity: 0.8,
        shadowRadius: 10,
        
        
    }


})

export default globalStyles
