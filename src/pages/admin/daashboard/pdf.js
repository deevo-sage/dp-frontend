import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { replies } from './staticsvars';
import { Button } from '@material-ui/core';

class Pdf extends React.Component {
  exportPDF = () => {
    const arr = ['Name', 'Number', 'Date', 'Police Station', 'Satisfaction', 'Behaviour', 'Cleanliness', 'Overall', 'Comment'];
    const unit = 'pt';
    const size = 'A4'; // Use A1, A2, A3 or A4
    const orientation = 'portrait'; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const station = this.props.station === 'all' ? 'stations' : 'station';
    let heading =
      this.props.startDate !== '' || this.props.endDate !== ''
        ? `${this.props.startDate === '' ? '' : ` from ${this.props.startDate}`} ${this.props.endDate === '' ? '' : ` till ${this.props.endDate}`}`
        : '';
    const title = 'Report for ' + this.props.station + ' ' + station + heading;
    const headers = [arr];

    let table = [];
    if (this.props.statuscount)
      table = [['', '', '', '', replies[this.props.statuscount[0]], replies[this.props.statuscount[1]], replies[this.props.statuscount[2]], replies[this.props.statuscount[3]]]];
    this.props.feedbacks.map((data) => {
      table.push([
        data.name,
        data.mobno,
        data.station,
        new Date(data.created_at).toDateString(),
        data.review ? data.review.satisfied : '',
        data.review ? data.review.behaviour : '',
        data.review ? data.review.cleanliness : '',
        data.review ? data.review.rating : '',
        data.review ? data.review.comment : '',
      ]);
      return '';
    });

    let content = {
      startY: 50,
      head: headers,
      body: table,
    };

    doc.text(title, marginLeft, 40, {}, {}, 'center');
    doc.autoTable(content);
    doc.save(title.split(' ').join('-'));
  };

  render() {
    return (
      <div>
        <Button style={{ fontSize: '1.15rem' }} variant="outlined" onClick={() => this.exportPDF()}>
          Generate Report
        </Button>
      </div>
    );
  }
}

export default Pdf;
