"use client";

import { AlphabetManager } from "@/utils/virtualize";
import styles from "./translation.module.css";

import { Button, Grid, PressEvent, Textarea } from "@nextui-org/react";
import { Card, Row } from "@nextui-org/react";
import { SetStateAction, useState } from "react";
import AnimateImages from "@its2easy/animate-images";
import React from "react";

type FrameInfo = {
  /**
   * - canvas context
   */
  context: CanvasRenderingContext2D;
  /**
   * - internal canvas width
   */
  width: number;
  /**
   * - internal canvas height
   */
  height: number;
};
export default function TranslationBox() {
  const alphabets = new AlphabetManager();
  const [value, setValue] = useState("السلام عليكم");
  const [disabled, setDisabled] = useState(false);

  const canvas = React.useRef(null);

  const handleChanges = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    // 👇️ access textarea value
    setValue(event.target.value);
    console.log(event.target.value);
  };

  const submit = (e: PressEvent) => {
    console.log("entered");
    setDisabled(true);

    let element: HTMLCanvasElement | null = canvas.current;
    let imagesArray = alphabets.getImageArray(value);

    if (element) {
      let instance = new AnimateImages(element, {
        images: imagesArray /* required */,
        preload: "none",
        preloadNumber: 20,
        loop: false,
        fps: 3,
        fillMode: 'contain',
        // responsiveAspect: "width",
        poster: "/alphabet/alpha32.jpg",
        // onBeforeFrame(arg0: AnimateImages, arg1: FrameInfo) {

        //   if (canvas.current) {
            
            
        //   }
        // },
        onAnimationEnd: () => {
          instance.stop();
          instance.destroy();

          setDisabled(false);
        },
      });

      instance.play();
    } else {
      setDisabled(false);
    }
  };

  //then  get the textfield changes from here

  return (
    <Grid.Container gap={2} css={{ minHeight: "50%" }}>
      <Grid css={{ height: "300px" }} xs={12} sm={6}>
        <Card>
          <Card.Body>
            <Textarea
              disabled={disabled}
              rows={9.5}
              aria-label="text to translate"
              label=""
              onChange={handleChanges}
              dir="rtl"
              initialValue="السلام عليكم"
              value={value}
              placeholder="السلام عليكم"
            ></Textarea>
          </Card.Body>
          <Card.Divider />
          <Card.Footer>
            <Row justify="flex-end">
              <Button onPress={submit} disabled={disabled}>
                ترجم
              </Button>
            </Row>
          </Card.Footer>
        </Card>
      </Grid>
      <Grid css={{ height: "300px" }} xs={12} sm={6}>
        <Card>
          <Card.Body>
            <canvas ref={canvas} className={styles.canvas_el} />
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
}
