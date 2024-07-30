// 文档  https://react-leaflet.js.org/
import { Map as LeafletMap } from 'leaflet'

import axios from 'axios'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMap
} from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import './App.css'
import queryString from 'query-string';
 
const NumberIcon = () => {
  return new Icon({
    iconUrl: 'l.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  })
}

function App() {
  const [start, setStart] = useState('29.56, 106.45')
  const [end, setEnd] = useState('29.56, 106.46')
  const [center, setcenter] = useState([29.56, 106.45])
  const [route, setRoute] = useState<any>([])
  const mapRef = useRef<LeafletMap>(null)

  useEffect(() => {
    // 初始化地图
    const queryParams = queryString.parse(location.search);
    console.log(` queryParams==>`,queryParams);

  }, [])

  const mapConfig = {
    center,
    zoom: 3,

    style: { height: '100%', width: '100%' }
    /**是否可缩放 */
    // scrollWheelZoom: false
  }
  const handleRoute = () => {
    const routes = // response.data.path.map((i: string[]) => {
      //   return i.reverse()
      // })
      [
        [94.75945816686475, 36.40305304582032],
        [94.770695, 36.4031981],
        [94.7705736, 36.4063919],
        [94.7705384, 36.409215],
        [94.7836039, 36.4092652],
        [94.7835467, 36.4138112],
        [94.7834174, 36.4285708],
        [94.783315, 36.4305097],
        [94.7844374, 36.4306817],
        [94.785447, 36.4308065],
        [94.7862623, 36.43089],
        [94.7875695, 36.4309837],
        [94.7888844, 36.4310462],
        [94.7998291, 36.4309929],
        [94.8063491, 36.4309108],
        [94.8237045, 36.4292985],
        [94.8350638, 36.4282151],
        [94.8419173, 36.4275355],
        [94.8433207, 36.4274508],
        [94.8443798, 36.4275113],
        [94.8451335, 36.4276635],
        [94.8456382, 36.4278265],
        [94.846185, 36.4280458],
        [94.8457271003773, 36.42512783489538]
      ].map((i: any[]) => {
        return i.reverse()
      })
    setRoute(routes)
    setcenter(routes[0])

    return
    axios
      .post(
        `http://192.168.5.246:8090/map/way`,
        // {
        //   pathWay: [[start], [end]]
        // },
        {
          pathWay: [
            [94.88686342315677, 36.408548095275435],
            [94.91853494720462, 36.40633760017791],
            [94.90291376190189, 36.40088017112323]
          ]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      )
      .then(() => {
        const routes = // response.data.path.map((i: string[]) => {
          //   return i.reverse()
          // })
          [
            [94.75945816686475, 36.40305304582032],
            [94.770695, 36.4031981],
            [94.7705736, 36.4063919],
            [94.7705384, 36.409215],
            [94.7836039, 36.4092652],
            [94.7835467, 36.4138112],
            [94.7834174, 36.4285708],
            [94.783315, 36.4305097],
            [94.7844374, 36.4306817],
            [94.785447, 36.4308065],
            [94.7862623, 36.43089],
            [94.7875695, 36.4309837],
            [94.7888844, 36.4310462],
            [94.7998291, 36.4309929],
            [94.8063491, 36.4309108],
            [94.8237045, 36.4292985],
            [94.8350638, 36.4282151],
            [94.8419173, 36.4275355],
            [94.8433207, 36.4274508],
            [94.8443798, 36.4275113],
            [94.8451335, 36.4276635],
            [94.8456382, 36.4278265],
            [94.846185, 36.4280458],
            [94.8457271003773, 36.42512783489538]
          ].map((i: any[]) => {
            return i.reverse()
          })
        setRoute(routes)
        setcenter(routes[0])
      })
  }


  function SetViewOnChange({}) {
    const map = useMap()
    map.on('click', ({ latlng }) => {
      map.setView([latlng.lat, latlng.lng])
    })
    return null
  }
  return (
    <div className="App">
      <div className="search">
        <input
          value={start}
          type="text"
          placeholder="start"
          onChange={e => setStart(e.target.value)}
        />
        <br />
        <input value={end} type="text" placeholder="end" onChange={e => setEnd(e.target.value)} />
        <br />
        <button onClick={handleRoute}>测试</button>
      </div>
      {/* @ts-ignore */}
      <MapContainer {...mapConfig} ref={mapRef}>
        {/* 地图 瓦片图层 */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {route && (
          <MarkerClusterGroup>
            <Polyline positions={route} {...{ color: '#527dbd' }} />
            {/* @ts-ignore */}
            {route.map((i, index) => {
              return (
                <Marker
                  key={index}
                  {...{
                    icon: NumberIcon(),
                    position: i
                  }}
                >
                  <Popup>
                    <h2>this is {index + 1}</h2>
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
        )}
        <SetViewOnChange />
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  )
}

export default App
