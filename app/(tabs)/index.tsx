import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { NaverMapView, NaverMapMarkerOverlay } from "@mj-studio/react-native-naver-map"; // Marker를 별도로 임포트해야 할 수 있음
import * as Location from "expo-location";
const App = () => {
    const [region, setRegion] = useState({
        latitude: 37.5665, // 기본값 (서울)
        longitude: 126.978,
        latitudeDelta: 0.01, // 확대/축소 조절 값
        longitudeDelta: 0.01, // 확대/축소 조절 값
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("위치 권한이 필요합니다.");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("현재위치", location.coords);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            {region ? (
                <NaverMapView
                    mapType={"Basic"}
                    style={styles.map}
                    isShowLocationButton={true}
                    initialRegion={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                        latitudeDelta: 0.15,
                        /** north-east 지점의 longitude와 longitude와의 경도차이 입니다. */
                        longitudeDelta: 0.15,
                    }}
                >
                    <NaverMapMarkerOverlay latitude={region.latitude} longitude={region.longitude} />

                    {/* 테스트용 */}
                    <NaverMapMarkerOverlay latitude={region.latitude + 0.02} longitude={region.longitude + 0.02} />
                </NaverMapView>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});

export default App;
