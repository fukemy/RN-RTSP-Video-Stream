import React, { PureComponent, memo } from 'react'
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native'
import { Collapse,CollapseHeader, CollapseBody } from 'accordion-collapse-react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { LivePlayer } from 'react-native-live-stream'
import Orientation from 'react-native-orientation-locker'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

class App extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resLiveRSTP: '',
      resDataCCTV: {
        'KANTOR PUSAT': [
          { namaTitik: 'R. Gedung C (LT. 1)', alamatIP: '10.1.43.39', thumbnailImg: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', statusDevices: 1 },
          { namaTitik: 'R. Gedung C (LT. 2)', alamatIP: '10.1.43.40', thumbnailImg: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', statusDevices: 1 },
          { namaTitik: 'R. Gedung C (LT. 3)', alamatIP: '10.1.43.41', thumbnailImg: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', statusDevices: 1 },
          { namaTitik: 'R. Gedung C (LT. 4)', alamatIP: '10.1.43.42', thumbnailImg: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', statusDevices: 1 },
          { namaTitik: 'R. Gedung C (LT. 5)', alamatIP: '10.1.43.43', thumbnailImg: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', statusDevices: 1 }
        ],
        'JAWA TIMUR': [
          { namaTitik: 'R. Lobby Depan', alamatIP: '10.1.43.39', thumbnailImg: 'https://turntable.kagiso.io/images/are_the_ghosts_back.original.jpg', statusDevices: 1 }
        ]
      },
      isMediaPause: false,
      isMediaMuted: true
    }
  }

  componentDidMount = () => {
    Orientation.lockToLandscapeLeft()
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#232b2b'}}>
        {/* Status Bar */}
        <StatusBar backgroundColor='#014d93'/>

        {/* Header */}
        <View style={{height: 50, width: wp('100%'), backgroundColor: '#014d93', padding: 12.5, elevation: 5}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {/* Back Button */}
            <TouchableOpacity style={{left: wp('1%'), flex: 0.10, flexDirection: 'row', position: 'absolute'}} activeOpacity={0.9} onPress={() => { }}>
              <Icon name={'arrow-left'} size={25} color={'#fff'}/>
            </TouchableOpacity>
            {/* Text Center */}
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: wp('1.7%'), fontFamily: 'HelveticaNeue-Medium', color: '#fff'}}>{'Live Monitoring Stream'}</Text>
              <Text style={{fontSize: wp('1.6%'), fontFamily: 'HelveticaNeue-Medium', color: '#fff', marginHorizontal: wp('0.8%')}}>{'•'}</Text>
              <Text style={{fontSize: wp('1.6%'), fontFamily: 'HelveticaNeue-Medium', color: '#1dbc60'}}>{'Online : 5'}</Text>
              <Text style={{fontSize: wp('1.6%'), fontFamily: 'HelveticaNeue-Medium', color: '#fff', marginHorizontal: wp('0.8%')}}>{'-'}</Text>
              <Text style={{fontSize: wp('1.6%'), fontFamily: 'HelveticaNeue-Medium', color: '#e74c3c'}}>{'Error : 0'}</Text>
            </View>
            {/* Home Button */}
            <TouchableOpacity style={{right: wp('1%'), flex: 0.10, flexDirection: 'row', position: 'absolute'}} activeOpacity={0.9} onPress={() => { }}>
              <Icon name={'home'} size={25} color={'#fff'}/>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main */}
        <View style={{flex: 1, flexDirection: 'row', }}>
          {/* Side Left */}
          <View style={{flex: 1}}>
            {/* Menu Button */}
            <View style={{bottom: 10, width: '50%', flex: 1, flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 10, padding: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', zIndex: 1}}>
              {
                this.state.isMediaMuted ?
                  <TouchableOpacity style={{marginLeft: wp('1.5%'), alignItems: 'center'}} activeOpacity={0.9} onPress={() => { this.setState({ isMediaMuted: false }) }}>
                    <Icon name={'volume-high'} size={28} color={'#014d93'}/>
                  </TouchableOpacity>
                :
                  <TouchableOpacity style={{marginLeft: wp('1.5%'), alignItems: 'center'}} activeOpacity={0.9} onPress={() => { this.setState({ isMediaMuted: true }) }}>
                    <Icon name={'volume-off'} size={28} color={'#014d93'}/>
                  </TouchableOpacity>
              }
              <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9} onPress={() => { this.setState({ isMediaPause: false }) }}>
                <Icon name={'play'} size={28} color={'#014d93'}/>
              </TouchableOpacity>
              <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9} onPress={() => { this.setState({ isMediaPause: true }) }}>
                <Icon name={'pause'} size={28} color={'#014d93'}/>
              </TouchableOpacity>
              <View style={{alignItems: 'center'}}>
                <Icon name={'skip-previous'} size={28} color={'#014d93'}/>
              </View>
              <View style={{marginRight: wp('1.5%'), alignItems: 'center'}}>
                <Icon name={'skip-next'} size={28} color={'#014d93'}/>
              </View>
            </View>
            {/* CCTV Live Preview */}
            <View style={{flex: 1}}>
              <LivePlayer source={{uri: this.state.resLiveRSTP}} ref={(ref) => { this.player = ref }} style={{width: undefined, height: '100%'}} paused={this.state.isMediaPause} muted={this.state.isMediaMuted} bufferTime={300} maxBufferTime={1000} resizeMode={'contain'} onLoading={()=>{}} onLoad={()=>{}} onEnd={()=>{}}></LivePlayer>
            </View>
          </View>

          {/* Side Right */}
          <View style={{flex: 0.48}}>
            <ScrollView style={{flex: 1}}>
              {
                // Loop Category
                Object.entries(this.state.resDataCCTV).map((item, key) => {
                  return (
                    <View key={key}>
                      <Collapse>
                        {/* Group Name */}
                        <CollapseHeader>
                          <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff', padding: 10, alignItems: 'center'}}>
                            <Icon name={'folder'} size={20} color={'#1a1a1a'}/>
                            <Text style={{fontSize: wp('1.5%'), fontFamily: 'HelveticaNeue-Medium', color: '#1a1a1a', marginLeft: wp('1%')}}>{`${item[0]} (${item[1].length})`}</Text>
                          </View>
                        </CollapseHeader>
                        {/* Group Content */}
                        <CollapseBody>
                          <View style={{flex: 1, padding: 10}}>
                            {/* Loop Content */}
                            {
                              item[1].map((childItem, childKey) => {
                                return (
                                  <View key={childKey} style={{flex: 1, flexDirection: 'row', marginBottom: hp('5%')}}>
                                    <FastImage style={{width: 80, height: 55, borderRadius: 2.5, borderWidth: 1, borderColor: '#e1e1e1'}} resizeMode={FastImage.resizeMode.cover} source={{uri: 'https://i.ytimg.com/vi/l693ce31ZRQ/maxresdefault.jpg', cache: FastImage.cacheControl.immutable, priority: FastImage.priority.high}}/>
                                    <View style={{flex: 1, marginLeft: wp('1.5%')}}>
                                      {/* Device Name */}
                                      <Text style={{fontSize: wp('1.5%'), fontFamily: 'HelveticaNeue-Medium', color: '#fff'}}>{childItem.namaTitik}</Text>
                                      {/* IP Information */}
                                      <View style={{flexDirection: 'row', marginLeft: wp('0.5%'), marginTop: wp('0.5%'), alignItems: 'center'}}>
                                        <Icon name={'play-network'} size={15} color={'#fff'}/>
                                        <Text style={{fontSize: wp('1.5%'), fontFamily: 'HelveticaNeue-Medium', color: '#fff', marginLeft: wp('0.25%')}}>{childItem.alamatIP}</Text>
                                      </View>
                                      {/* Status Information */}
                                      <View style={{flexDirection: 'row', marginLeft: wp('0.5%'), marginTop: wp('0.5%'), alignItems: 'center'}}>
                                        {
                                          childItem.statusDevices ?
                                            <Text style={{fontSize: wp('1.4%'), fontFamily: 'HelveticaNeue-Medium', color: '#1dbc60', marginLeft: wp('0.25%')}}>• online</Text>
                                          :
                                            <Text style={{fontSize: wp('1.4%'), fontFamily: 'HelveticaNeue-Medium', color: '#e74c3c', marginLeft: wp('0.25%')}}>• offline</Text>
                                        }
                                      </View>
                                    </View>
                                  </View>
                                )
                              })
                            }
                          </View>
                        </CollapseBody>
                      </Collapse>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default memo(App)