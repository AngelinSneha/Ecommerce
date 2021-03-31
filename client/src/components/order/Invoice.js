import React from 'react'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import {Table, TableHeader, TableCell, TableBody, DataTableCell} from "@david.kucsai/react-pdf-table"

const styles = StyleSheet.create({
    body: {
      paddingTop: 30,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      marginTop: 5,
      color:"#001529",
      textAlign: "center",
      marginBottom: 50,
    },
    subtitle: {
      fontSize: 18,
      margin: 10,
      marginBottom: 40,
      marginLeft: 0,
    },
    text: {
        margin: 40,
      marginLeft: 0,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "left",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
    tableMargin: {
        marginLeft: 30,
        marginBottom:40
    }
  });

function Invoice({order}) {
    
    return (
        <Document>
            <Page style={styles.body} >
                <Text style={styles.header} fixed > {new Date().toLocaleDateString('en-GB')} </Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.author}>ShopDeal</Text>
                <Text style={styles.subtitle}>Order Summary:</Text>
                <Table style={styles.tableMargin}>
                    <TableHeader>
                        <TableCell style={{padding: "10px"}}>Title</TableCell>
                        <TableCell style={{padding: "10px"}}>Price</TableCell>
                        <TableCell style={{padding: "10px"}}>Quantity</TableCell>
                        {/* <TableCell style={{padding: "10px"}}>Brand</TableCell> */}
                        <TableCell style={{padding: "10px"}}>Color</TableCell>
                    </TableHeader>
                </Table>
                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell style={{padding: "10px"}} getContent={(x) => x.product.title} />
                        <DataTableCell style={{padding: "10px"}} getContent={(x) => `${x.product.price}`} />
                        <DataTableCell style={{padding: "10px"}} getContent={(x) => x.count} />
                        {/* <DataTableCell style={{padding: "10px"}} getContent={(x) => x.product.brand} /> */}
                        <DataTableCell style={{padding: "10px"}} getContent={(x) => x.product.color} />
                    </TableBody>
                </Table>
                <Text style={styles.text}>
                    <Text style={{padding: "10px"}}>Date Of Order: {"    "}{new Date(order.paymentIntent.created * 1000).toLocaleString()}</Text>{"\n"}
                    <Text style={{padding: "10px"}}>Order Id: {"              "}{order.paymentIntent.id}</Text>{"\n"}
                    <Text style={{padding: "10px"}}>Order status: {"       "}{order.orderStatus}</Text>{"\n"}
                    <Text style={{padding: "10px"}}>Total Paid: {"           "}Rs {order.paymentIntent.amount}</Text>{"\n"}
                </Text>
                <Text style={styles.footer}>~ Thank You for Shopping with Us! ~</Text>
            </Page>
        </Document>
    )
}

export default Invoice
