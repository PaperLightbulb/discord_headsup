#define LILYGO_T5_V213


#include <boards.h>
#include <GxEPD.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <GxDEPG0213BN/GxDEPG0213BN.h>

#include <Fonts/FreeMono9pt7b.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>

const char* ssid = "UofM-IoT";
const char* password = "phoebads96fidalgo";

String serverName = "https://leading-jointly-bluejay.ngrok-free.app";

unsigned long last = 0;

unsigned long timer = 500;

GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);

String old = "";

void prn(String s) {
  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);
  display.setCursor(0,11);
  display.println(s);
  display.update();
}

void connect() {
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup(void)
{
  Serial.begin(115200);
  Serial.println();
  Serial.println("setup");

  SPI.begin(EPD_SCLK, EPD_MISO, EPD_MOSI);
  display.init();

  connect();

  display.setRotation(1);
  display.setFont(&FreeMono9pt7b);
 
  Serial.println("setup done");
}


void loop()
{ 
  if ((millis() - last) > timer) {
    if(WiFi.status()== WL_CONNECTED){
      HTTPClient http;

      String serverPath = serverName + "/messages";
      http.begin(serverPath.c_str());

      http.setAuthorization("Arbor", "TapeBl0t");

      http.setUserAgent("password");
      
      int httpResponseCode = http.GET();
      
      if (httpResponseCode>0) {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        String payload = http.getString();
        if (old != payload) {
          Serial.println(payload);
          prn(payload);
        }
        old = payload;
      }
      else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
      connect();
    }
    last = millis();
  }

    
}

void serialEvent() {
  
}

