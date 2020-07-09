import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      partners: state.partners
    };
};

function Mission() {
    return (
        <Card title="Our Mission" wrapperStyle={{margin:20}}>
                
        <Text>We present a curated database of the best campsites in the vast woods and backcountry of the World Wide Web Wilderness. 
                We increase access to adventure for the public while promoting safe and respectful use of resources. The expert wilderness 
                trekkers on our staff personally verify each campsite to make sure that they are up to our standards. We also present a platform 
                for campers to share reviews on campsites they have visited with each other.
        </Text>
    
        </Card>
    );
}


class About extends Component {


    static navigationOptions = {
        title: 'About Us'
    }
    

    render() {
        const renderPartner = ({item}) => {
            return (
                <ListItem
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        }
        if (this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                        <Text>{this.props.partners.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Mission />
                <Card title="Community Partners">
                    <FlatList                                       
                        data={this.props.partners.partners}                  
                        renderItem={renderPartner}                  // renderItem function has a built-in item property which expects an object, so we can destructure it in the renderPartner fxn
                        keyExtractor={item => item.id.toString()}  
                    />  
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);