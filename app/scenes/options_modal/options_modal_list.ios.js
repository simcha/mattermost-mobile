// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import React, {PropTypes, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Font from 'react-native-vector-icons/FontAwesome';

import FormattedText from 'app/components/formatted_text';

export default class OptionsModalList extends PureComponent {
    static propTypes = {
        items: PropTypes.array.isRequired,
        onCancelPress: PropTypes.func,
        title: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ])
    }

    renderOptions = () => {
        const {items} = this.props;

        const options = items.map((item, index) => {
            let textComponent;
            if (item.text.hasOwnProperty('id')) {
                textComponent = (
                    <FormattedText
                        style={[style.optionText, item.textStyle, (!item.icon && {textAlign: 'center'})]}
                        {...item.text}
                    />
                );
            } else {
                textComponent = <Text style={[style.optionText, item.textStyle, (!item.icon && {textAlign: 'center'})]}>{item.text}</Text>;
            }

            return (
                <TouchableOpacity
                    key={index}
                    onPress={item.action}
                    style={[style.option, (index < items.length - 1 && style.optionBorder)]}
                >
                    {textComponent}
                    {item.icon &&
                        <Font
                            name={item.icon}
                            size={18}
                            style={style.optionIcon}
                        />
                    }
                </TouchableOpacity>
            );
        });

        let title;
        let titleComponent;
        if (this.props.title) {
            if (this.props.title.hasOwnProperty('id')) {
                titleComponent = (
                    <FormattedText
                        style={style.optionTitleText}
                        {...this.props.title}
                    />
                );
            } else {
                titleComponent = <Text style={style.optionTitleText}>{this.props.title}</Text>;
            }

            title = (
                <View
                    key={items.length}
                    style={[style.option, style.optionBorder]}
                >
                    {titleComponent}
                </View>
            );
        }

        return [
            title,
            ...options
        ];
    }

    render() {
        const {onCancelPress} = this.props;

        return (
            <View style={style.wrapper}>
                <View style={style.optionContainer}>
                    {this.renderOptions()}
                </View>
                <View style={style.optionContainer}>
                    <TouchableOpacity
                        onPress={onCancelPress}
                        style={style.option}
                    >
                        <Text style={style.optionCancelText}>{'Cancel'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    option: {
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)'
    },
    optionCancelText: {
        color: '#CC3239',
        flex: 1,
        fontSize: 20,
        textAlign: 'center'
    },
    optionContainer: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 20,
        marginHorizontal: 20
    },
    optionIcon: {
        color: '#4E8ACC'
    },
    optionText: {
        color: '#4E8ACC',
        flex: 1,
        fontSize: 20
    },
    optionTitleText: {
        color: '#7f8180',
        flex: 1,
        textAlign: 'center'
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});
