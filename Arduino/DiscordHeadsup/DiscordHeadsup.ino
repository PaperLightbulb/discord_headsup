#define LILYGO_T5_V213


#include <boards.h>
#include <GxEPD.h>

#include <GxDEPG0213BN/GxDEPG0213BN.h>

#include <Fonts/FreeMono9pt7b.h>
#include <GxIO/GxIO_SPI/GxIO_SPI.h>
#include <GxIO/GxIO.h>


GxIO_Class io(SPI,  EPD_CS, EPD_DC,  EPD_RSET);
GxEPD_Class display(io, EPD_RSET, EPD_BUSY);


void setup(void)
{
    Serial.begin(115200);
    Serial.println();
    Serial.println("setup");

    SPI.begin(EPD_SCLK, EPD_MISO, EPD_MOSI);
    display.init(); // enable diagnostic output on Serial

    Serial.println("setup done");
}


void loop()
{

    
}

void serialEvent() {
  display.setRotation(1);
  display.fillScreen(GxEPD_WHITE);
  display.setTextColor(GxEPD_BLACK);
  display.setFont(&FreeMono9pt7b);
  display.setCursor(0,11);
  display.println(Serial.readString());
  display.update();
}

