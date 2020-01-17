import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
export default class AboutCompanyVision extends Component {
  render() {
    return (
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            <h4>ปรัชญา</h4><br />
            <p style={{ textIndent:'10%'}}>
              ชีวิตของมนุษย์ต่างได้ใช้ชีวิตไปตามเข็มของนาฬิกา ภายใต้จิตใต้สำนึกของแต่ละคน ซึ่ง
              บางคนเรียก “นาฬิกาชีวิต” ย่อมต้องมีความโลภ ความโกรธ ความหลง เกิดขึ้นได้ภายในสังคมนั้น
              คือปัญหาและอุปสรรคของการดำเนินชีวิตมนุษย์ในสังคม ทางเราได้เล็งเห็นปัญหาและอุปสรรค
              ต่างๆในสังคม และเราก็เป็นส่วนหนึ่งของสังคมย่อมตระหนักดีว่า งานการบริการองค์กรในทาง
              ธุรกิจ ในเรื่องการแก้ปัญหาและอุปสรรคในสังคม จะต้องไม่เป็ นการก่อหรือซ้ำเติมปัญหาและ
              อุปสรรคเพิ่มขึ้นให้แก่บุคคลดังกล่าวเหล่านั้นอีก ซึ่งหากเรากระทำเฉกเช่นนั้นอีก ก็ย่อมเป็นการ
              เพิ่มเติมปัญหาต่างๆให้แก่เพื่อนมนุษย์ในสังคมอีก และก็ถือว่าเราผู้มีวิชาชีพทนายความ ก็เป็นตัว
              สร้างปัญหาให้แก่สังคมอีกด้วย.
          </p>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            <h4>วิสัยทัศน์</h4><br />
            <p style={{ textIndent:'10%'}}>
              ในการเป็นองค์กรในการให้บริการจะดำเนินการบริหารกิจการให้การปรึกษา ช่วยเหลือและ
              แนะนำเพื่อให้ผู้รับบริการสามารถมองเห็นวิธีการแก้ปัญหาทางการเงิน หนี้สิน และการจัดการ
              ทรัพย์สิน ภายใต้ขอบความเป็นธรรมทางกฎหมาย และแม่นยำในเจตนารมณ์ของกฎหมาย และการจริงใจในการให้บริการขององค์กร.
          </p>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            <h4>เป้าหมาย และ ภารกิจ</h4><br />
            <p style={{ textIndent:'10%'}}>
              องค์กรมีเป้าหมายการให้บริการแก่ผู้รับบริการ โดยแนะนำทางออกที่ดีที่สุดแก่บุคคลต่างๆ
              ไม่ว่าจะเป็นเจ้าหนี้หรือลูกหนี้ เพื่อป้องกันปัญหาที่อาจจะเกิดขึ้นในอนาคต เพื่อบรรเทาเยียวยาปัญหาที่เกิดขึ้นมาแล้ว
              ให้บรรดาเจ้าหนี้และลูกหนี้ได้รับโอกาสในการใช้ชีวิตทางสังคมอย่างปกติสุข หนึ่งการป้องกันและการแก้ปัญหา คือหนึ่งความสุขขององค์กร
              เราจะพัฒนานำพาองค์กรด้วยภารกิจสู่เป้าหมายของการให้บริการ ด้วยบุคลากรที่จะต้องเรียนรู้อย่างต่อเนื่อง เพื่อให้มีความรู้ความเชี่ยวชาญ
              เพื่อสร้างความเชื่อมั่นและความพึ่งพอใจแก่ผู้รับบริการ โดยสามารถตรวจสอบ รายงานผลการดำเนินการเป็นระยะ ด้วยความเข้มงวดของทุกกระบวนการในการบริการ
              ด้วยความรวดเร็วถูกต้อง ภายใต้คุณธรรมและความซื่อสัตย์ของวิชาชีพทนายความ.
          </p>
          </div>
          </Col>
        </Row>
      </Container>
    )
  }
}